# Iconos SEO - Instrucciones

Para generar los iconos necesarios para SEO, necesitas crear las siguientes imágenes en la carpeta `public/`:

## Iconos requeridos:

1. **favicon.ico** - 16x16, 32x32, 48x48 (formato ICO)
2. **icon-16x16.png** - 16x16 píxeles
3. **icon-32x32.png** - 32x32 píxeles
4. **icon-192x192.png** - 192x192 píxeles (PWA)
5. **icon-512x512.png** - 512x512 píxeles (PWA)
6. **apple-touch-icon.png** - 180x180 píxeles
7. **safari-pinned-tab.svg** - SVG para Safari

## Herramientas recomendadas:

- **Favicon Generator**: https://realfavicongenerator.net/
- **PWA Asset Generator**: https://github.com/onderceylan/pwa-asset-generator
- **ImageMagick**: Para conversión de formatos

## Pasos:

1. Tener una imagen base de 512x512 píxeles (PNG, fondo transparente recomendado)
2. Generar todos los tamaños usando una herramienta como RealFaviconGenerator
3. Colocar todos los archivos en la carpeta `public/`
4. El `site.webmanifest` ya está configurado

## Notas:

- Los iconos deben tener buen contraste
- Usar formato PNG para mejor calidad
- El favicon.ico puede contener múltiples tamaños
- El apple-touch-icon debe ser 180x180 (requerimiento de Apple)

