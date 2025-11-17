# Usar nginx como servidor web ligero
FROM nginx:alpine

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar página principal de bienvenida (v2.0 - Nueva por defecto)
COPY index.html /usr/share/nginx/html/index.html

# Copiar archivos de la versión 2.0 (Personalizable - RECOMENDADA)
COPY config.html /usr/share/nginx/html/
COPY evaluation.html /usr/share/nginx/html/
COPY styles-config.css /usr/share/nginx/html/
COPY styles-evaluation.css /usr/share/nginx/html/
COPY script-config.js /usr/share/nginx/html/
COPY script-evaluation.js /usr/share/nginx/html/

# Copiar archivos compartidos
COPY script.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

# Copiar versiones anteriores (accesibles por URL directa)
COPY index-selector.html /usr/share/nginx/html/
COPY index-xba.html /usr/share/nginx/html/
COPY script-xba.js /usr/share/nginx/html/
COPY script-old.js /usr/share/nginx/html/

# Copiar archivos de test
COPY test-conversiones.html /usr/share/nginx/html/
COPY test-linechart.html /usr/share/nginx/html/
COPY test-xba.html /usr/share/nginx/html/
COPY test-sistema.html /usr/share/nginx/html/

# Crear directorio docs
RUN mkdir -p /usr/share/nginx/html/docs

# Copiar documentación completa
COPY README.md /usr/share/nginx/html/docs/
COPY GUIA-USO.md /usr/share/nginx/html/docs/
COPY CAMBIOS-V2.md /usr/share/nginx/html/docs/
COPY ESTRUCTURA-ARCHIVOS.md /usr/share/nginx/html/docs/
COPY INICIO-RAPIDO.md /usr/share/nginx/html/docs/
COPY INICIO-RAPIDO-V2.txt /usr/share/nginx/html/docs/
COPY TROUBLESHOOTING.md /usr/share/nginx/html/docs/
COPY DOCKERIZACION-COMPLETADA.md /usr/share/nginx/html/docs/
COPY CAMBIOS-PUNTUACIONES-ESTANDARIZADAS.md /usr/share/nginx/html/docs/
COPY CAMBIOS-GRAFICO-LINEAS.md /usr/share/nginx/html/docs/
COPY CROSS-BATTERY-ASSESSMENT.md /usr/share/nginx/html/docs/
COPY IMPLEMENTACION-XBA.md /usr/share/nginx/html/docs/
COPY COMPLETADO-XBA-FASE2.md /usr/share/nginx/html/docs/
COPY BIBLIOGRAFIA-XBA.md /usr/share/nginx/html/docs/
COPY INFORME_NP_EJEMPLO.pdf /usr/share/nginx/html/docs/

# Exponer el puerto 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Nginx se ejecuta automáticamente con la imagen base
CMD ["nginx", "-g", "daemon off;"]
