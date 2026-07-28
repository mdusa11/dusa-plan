# Publicador Dusa — Instagram vía Graph API

Script para publicar tus posts en Instagram (y Facebook opcional) con un comando.
**Tú lo controlas.** Tu token vive en un `.env` local que **nunca** se sube a git ni se comparte.

> ⚠️ Antes que nada: si pegaste un token en algún chat, **regénéralo** en
> developers.facebook.com. Un token es una llave de tu cuenta.

---

## Qué necesitas ANTES (setup de una vez, ~1 tarde)

Sin esto, ni este script ni ningún otro puede publicar por API. No es opcional.

1. **Instagram en modo Empresa** (no personal).
   App de Instagram → Ajustes → Cuenta → Cambiar a cuenta profesional → Empresa.
2. **Una Página de Facebook**, vinculada a esa cuenta de Instagram.
   (Instagram → Ajustes → Cuentas vinculadas / Centro de cuentas.)
3. **Tu app de Meta** (`dusasolutions`) con el producto **Instagram Graph API** agregado
   y estos permisos: `instagram_basic`, `instagram_content_publish`,
   `pages_show_list`, `pages_read_engagement`.
   Como tu app está en modo desarrollo, solo publica en TUS cuentas (con eso basta).
4. **Un token de acceso largo** (60 días) con esos permisos. Ver abajo cómo sacarlo.

## Cómo obtener el token (resumen)

1. developers.facebook.com → tu app → Herramientas → **Graph API Explorer**.
2. Arriba, elige la app `dusasolutions` y "Token del usuario".
3. En permisos agrega: `instagram_basic`, `instagram_content_publish`,
   `pages_show_list`, `pages_read_engagement`. Genera el token.
4. Ese token dura ~1-2 h. Para uno de **60 días**, intercámbialo:
   ```
   https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=TU_APP_ID&client_secret=TU_APP_SECRET&fb_exchange_token=TOKEN_CORTO
   ```
   El `access_token` que responde es el largo. Ese va en `.env`.

## Instalar y configurar

```bash
cd publicar
cp .env.example .env      # crea tu .env
# edita .env y pega tu ACCESS_TOKEN
node publish.mjs --whoami # te dice tu IG_USER_ID y FB_PAGE_ID
# copia esos IDs a .env
```

## Publicar

```bash
node publish.mjs post-01            # publica un post en Instagram
node publish.mjs carrusel-idea      # publica un carrusel (5 slides)
node publish.mjs post-01 --fb       # además en tu página de Facebook
node publish.mjs post-01 --dry      # ensayo: muestra el texto, no publica
```

Posts disponibles: mira las claves en `posts.json` (post-01 … post-09,
carrusel-idea, carrusel-validar, carrusel-errores).

## Automatizarlo (opcional, cuando ya funcione)

Puedes ponerlo en un cron de tu Mac para que publique solo. Ejemplo, martes 7pm:
```
0 19 * * 2  cd /ruta/dusa-plan/publicar && /usr/local/bin/node publish.mjs post-01
```
> Ojo: tu Mac debe estar encendida a esa hora. Para algo 100% en la nube haría falta
> un servidor. Por eso, para 3 posts/semana, **Meta Business Suite sigue siendo más simple.**
> Este script es para cuando quieras control total o mucho volumen.

## Límites honestos

- El **token caduca cada 60 días**: hay que renovarlo (o programar el refresco).
- Las **imágenes deben seguir públicas** (viven en la carpeta `img/` del repo, servidas por GitHub Pages).
- Con la app en modo desarrollo solo publicas en **tus** cuentas. Para cuentas de
  terceros necesitarías App Review de Meta.
- Instagram permite ~25 publicaciones por día vía API (más que suficiente).

## Seguridad

- `.env` está en `.gitignore`: tu token **no** se sube. Verifica con `git status`.
- Si crees que tu token se filtró, regénéralo de inmediato.
- Nunca pegues el token en un chat, captura o mensaje.
