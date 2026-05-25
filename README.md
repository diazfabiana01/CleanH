# CLEANUS - Plataforma de Servicios de Limpieza

CLEANUS es una aplicación web completa que simula una empresa dedicada a facilitar la contratación de personal de servicio doméstico confiable y calificado para hogares y oficinas.

## 🌟 Características Principales

### Página de Inicio
- **Diseño atractivo** con azul cielo como color predominante
- **Secciones informativas** sobre los beneficios del servicio
- **Navegación intuitiva** con menú responsive
- **Call-to-action** prominentes para registro y solicitud de servicios

### Sistema de Registro y Autenticación
- **Formulario de registro completo** con validación en tiempo real
- **Subida de documentos PDF** para verificación de identidad
- **Validaciones robustas** para todos los campos
- **Sistema de login simulado** con persistencia de sesión

### Portal de Usuario
- **Dashboard personalizado** para usuarios registrados
- **Programación de servicios** con selección de fecha, operarios y duración
- **Cálculo automático de precios** basado en parámetros seleccionados
- **Proceso de pago simulado** con confirmación

### Funcionalidades Técnicas
- **Diseño completamente responsive** para todos los dispositivos
- **Validación de formularios** tanto del lado cliente como en tiempo real
- **Almacenamiento local** para simular base de datos
- **Interfaz de usuario moderna** con animaciones y transiciones suaves

## 🚀 Cómo Usar la Aplicación

### 1. Página Principal
- Abre `index.html` en tu navegador
- Explora las secciones de beneficios y información de la empresa
- Haz clic en "Solicitar Servicio" o "Registrarse" para comenzar

### 2. Registro de Usuario
- Completa todos los campos requeridos:
  - Nombre completo
  - Correo electrónico
  - Número de teléfono (10 dígitos)
  - Dirección completa
  - Contraseña (mínimo 6 caracteres)
  - Documento de identidad en PDF
- El sistema validará todos los campos automáticamente
- Tras un registro exitoso, podrás iniciar sesión

### 3. Iniciar Sesión
- Usa las credenciales creadas durante el registro
- El sistema recordará tu sesión para futuras visitas
- Serás redirigido automáticamente al portal de usuario

### 4. Portal de Usuario
- **Programar servicio**: Selecciona fecha, número de operarios y duración
- **Calcular total**: El sistema calculará automáticamente el costo
- **Proceder al pago**: Simula el proceso de pago
- **Confirmación**: Recibe confirmación de solicitud exitosa

## 📁 Estructura del Proyecto

```
CleanUp/
├── index.html          # Página principal con toda la estructura
├── styles.css          # Estilos CSS con diseño responsive
├── script.js           # Funcionalidad JavaScript completa
└── README.md           # Documentación del proyecto
```

## 🎨 Diseño y Colores

### Paleta de Colores
- **Azul Cielo Principal**: `#87CEEB`
- **Azul Cielo Oscuro**: `#5F9FBF`
- **Azul Muy Claro**: `#F0F8FF`
- **Azul Acero**: `#4682B4`
- **Texto Principal**: `#2C3E50`
- **Texto Secundario**: `#7F8C8D`

### Tipografía
- **Fuente Principal**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Diseño limpio y moderno** que transmite confianza y profesionalismo

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsive con Grid y Flexbox
- **JavaScript ES6+**: Funcionalidad interactiva y validaciones
- **Font Awesome**: Iconografía moderna
- **LocalStorage**: Simulación de base de datos

## 🔧 Funcionalidades Técnicas Destacadas

### Validaciones
- **Email**: Formato válido con regex
- **Teléfono**: 10 dígitos numéricos
- **Contraseñas**: Coincidencia y longitud mínima
- **Archivos**: Solo PDF, máximo 5MB
- **Fechas**: Solo fechas futuras para servicios

### Experiencia de Usuario
- **Validación en tiempo real** mientras el usuario escribe
- **Estados de carga** para procesos simulados
- **Mensajes de error claros** y específicos
- **Confirmaciones** para acciones importantes
- **Navegación suave** entre secciones

### Responsive Design
- **Mobile-first approach**
- **Menú hamburguesa** para dispositivos móviles
- **Grid adaptativo** para diferentes tamaños de pantalla
- **Tipografía escalable** según el dispositivo

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles (iOS/Android)

## 🛠️ Instalación y Configuración

1. **Descarga los archivos** del proyecto
2. **Abre index.html** en tu navegador web
3. **¡Listo!** No requiere instalación adicional

### Para Desarrollo Local
```bash
# Si tienes Python instalado, puedes usar un servidor local
python -m http.server 8000

# O con Node.js
npx http-server
```

## 🔄 Flujo de Usuario Completo

1. **Llegada al sitio** → Visualización de beneficios y servicios
2. **Registro** → Completar formulario con validaciones
3. **Confirmación** → Mensaje de registro exitoso
4. **Login** → Acceso con credenciales
5. **Portal** → Dashboard personalizado
6. **Solicitud** → Configuración del servicio deseado
7. **Cotización** → Cálculo automático de precios
8. **Pago** → Proceso de pago simulado
9. **Confirmación** → Mensaje de solicitud exitosa

## 📋 Datos de Prueba

Para probar la aplicación, puedes usar estos datos de ejemplo:

```
Nombre: Juan Pérez
Email: juan@ejemplo.com
Teléfono: 3001234567
Contraseña: 123456
```

## 🎯 Características Educativas

Este proyecto es ideal para aprender:

- **HTML semántico** y estructura de páginas web
- **CSS moderno** con variables, Grid y Flexbox
- **JavaScript ES6+** con funciones avanzadas
- **Validación de formularios** del lado cliente
- **Diseño responsive** y mobile-first
- **Experiencia de usuario (UX)** y interfaz (UI)
- **Simulación de APIs** y almacenamiento local

## 🚀 Posibles Mejoras Futuras

- Integración con APIs reales de pago
- Base de datos real (MySQL, MongoDB)
- Sistema de notificaciones por email
- Chat en tiempo real con operarios
- Sistema de calificaciones y reseñas
- Geolocalización para servicios
- Panel administrativo

## 📞 Soporte

Este es un proyecto educativo y de demostración. Para preguntas sobre el código o implementación, puedes revisar los comentarios detallados en cada archivo.

---

**CLEANUS** - Conectando hogares con servicios de limpieza confiables 🏠✨ # CleanH
