#!/usr/bin/env node
/**
 * Dusa — Publicador de Instagram (y Facebook opcional) vía Graph API.
 * SIN dependencias. Node 18+.
 *
 * Uso:
 *   node publish.mjs --whoami            # descubre tu IG_USER_ID y páginas
 *   node publish.mjs post-01             # publica un post en Instagram
 *   node publish.mjs carrusel-idea       # publica un carrusel
 *   node publish.mjs post-01 --fb        # además publica en tu página de Facebook
 *   node publish.mjs post-01 --dry       # muestra qué haría, sin publicar
 *
 * Config: crea un archivo .env (copia .env.example). NUNCA lo subas a git.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const API = "https://graph.facebook.com/v21.0";

// ---- cargar .env (parser mínimo, sin dependencias) ----
function loadEnv() {
  const env = {};
  try {
    for (const line of readFileSync(join(DIR, ".env"), "utf8").split("\n")) {
      const s = line.trim();
      if (!s || s.startsWith("#")) continue;
      const i = s.indexOf("=");
      if (i > 0) env[s.slice(0, i).trim()] = s.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  } catch { /* sin .env */ }
  return env;
}
const env = loadEnv();
const TOKEN = env.ACCESS_TOKEN;
const IG = env.IG_USER_ID;
const PAGE_ID = env.FB_PAGE_ID;
const PAGE_TOKEN = env.FB_PAGE_TOKEN || TOKEN;

const args = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith("--")));
const postId = args.find(a => !a.startsWith("--"));
const DRY = flags.has("--dry");

function die(msg) { console.error("\n❌ " + msg + "\n"); process.exit(1); }
async function gp(method, path, params) {
  const url = new URL(API + path);
  const body = new URLSearchParams({ access_token: TOKEN, ...params });
  const res = await fetch(url, method === "GET"
    ? { method, headers: {} } // GET usa query
    : { method, body });
  if (method === "GET") { // reintento con query para GET
    const u2 = new URL(API + path); u2.search = body.toString();
    const r2 = await fetch(u2); return r2.json();
  }
  return res.json();
}
async function post(path, params) {
  const res = await fetch(API + path, { method: "POST", body: new URLSearchParams({ access_token: TOKEN, ...params }) });
  const j = await res.json();
  if (j.error) throw new Error(j.error.message + " (code " + j.error.code + ")");
  return j;
}
async function getStatus(id) {
  const u = new URL(API + "/" + id); u.search = new URLSearchParams({ access_token: TOKEN, fields: "status_code" }).toString();
  return (await fetch(u)).json();
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitReady(containerId) {
  for (let i = 0; i < 20; i++) {
    const s = await getStatus(containerId);
    if (s.status_code === "FINISHED") return;
    if (s.status_code === "ERROR") throw new Error("Meta rechazó la imagen (¿URL pública/JPEG/tamaño?)");
    await sleep(3000);
  }
  throw new Error("La imagen tardó demasiado en procesarse.");
}

// ---------- WHOAMI ----------
async function whoami() {
  if (!TOKEN) die("Falta ACCESS_TOKEN en .env");
  const me = await gp("GET", "/me/accounts", { fields: "name,id,instagram_business_account{id,username}" });
  if (me.error) die("Token inválido o sin permisos: " + me.error.message);
  console.log("\n📄 Tus páginas de Facebook y cuentas de Instagram vinculadas:\n");
  for (const p of (me.data || [])) {
    console.log(`  Página: ${p.name}  (FB_PAGE_ID=${p.id})`);
    if (p.instagram_business_account)
      console.log(`     ↳ Instagram @${p.instagram_business_account.username}  (IG_USER_ID=${p.instagram_business_account.id})\n`);
    else
      console.log("     ↳ (sin Instagram Business vinculado)\n");
  }
  console.log("Copia esos IDs a tu archivo .env.\n");
}

// ---------- INSTAGRAM ----------
async function publishIG(p) {
  if (!IG) die("Falta IG_USER_ID en .env (corre: node publish.mjs --whoami)");
  let creationId;
  if (p.tipo === "carrusel") {
    console.log(`  Subiendo ${p.imagenes.length} slides…`);
    const children = [];
    for (const img of p.imagenes) {
      const c = await post(`/${IG}/media`, { image_url: img, is_carousel_item: "true" });
      await waitReady(c.id); children.push(c.id);
    }
    const cont = await post(`/${IG}/media`, { media_type: "CAROUSEL", children: children.join(","), caption: p.texto });
    await waitReady(cont.id); creationId = cont.id;
  } else {
    const c = await post(`/${IG}/media`, { image_url: p.imagenes[0], caption: p.texto });
    await waitReady(c.id); creationId = c.id;
  }
  const pub = await post(`/${IG}/media_publish`, { creation_id: creationId });
  console.log(`  ✅ Instagram publicado. ID: ${pub.id}`);
}

// ---------- FACEBOOK (opcional) ----------
async function publishFB(p) {
  if (!PAGE_ID) die("Falta FB_PAGE_ID en .env para publicar en Facebook");
  const t = PAGE_TOKEN;
  if (p.tipo === "carrusel" || p.imagenes.length > 1) {
    const ids = [];
    for (const img of p.imagenes) {
      const r = await fetch(`${API}/${PAGE_ID}/photos`, { method: "POST", body: new URLSearchParams({ access_token: t, url: img, published: "false" }) }).then(r => r.json());
      if (r.error) throw new Error(r.error.message); ids.push(r.id);
    }
    const attached = ids.map(id => ({ media_fbid: id }));
    const feed = await fetch(`${API}/${PAGE_ID}/feed`, { method: "POST", body: new URLSearchParams({ access_token: t, message: p.texto, attached_media: JSON.stringify(attached) }) }).then(r => r.json());
    if (feed.error) throw new Error(feed.error.message);
    console.log(`  ✅ Facebook publicado. ID: ${feed.id}`);
  } else {
    const r = await fetch(`${API}/${PAGE_ID}/photos`, { method: "POST", body: new URLSearchParams({ access_token: t, url: p.imagenes[0], caption: p.texto }) }).then(r => r.json());
    if (r.error) throw new Error(r.error.message);
    console.log(`  ✅ Facebook publicado. ID: ${r.post_id || r.id}`);
  }
}

// ---------- MAIN ----------
(async () => {
  if (flags.has("--whoami")) return whoami();
  if (!postId) die("Dime qué post publicar. Ej: node publish.mjs post-01   (o --whoami)");
  const posts = JSON.parse(readFileSync(join(DIR, "posts.json"), "utf8"));
  const p = posts[postId];
  if (!p) die(`No existe el post "${postId}". Opciones: ${Object.keys(posts).join(", ")}`);

  console.log(`\n📤 ${postId} — ${p.titulo}`);
  console.log(`   ${p.imagenes.length} imagen(es) · ${p.tipo}`);
  if (DRY) { console.log("\n(--dry) No se publicó. Texto:\n\n" + p.texto + "\n"); return; }
  if (!TOKEN) die("Falta ACCESS_TOKEN en .env (copia .env.example a .env y llénalo).");

  try {
    await publishIG(p);
    if (flags.has("--fb")) await publishFB(p);
    console.log("\n🎉 Listo.\n");
  } catch (e) {
    die("Falló la publicación: " + e.message +
      "\n\nRevisa: 1) token con permiso instagram_content_publish  2) IG en modo Empresa vinculado a una Página  3) imágenes accesibles públicamente.");
  }
})();
