// Variables globales para el estado de la aplicación
let currentUser = null;
let isLoggedIn = false;

// Configuración de precios (simulado)
const PRICING = {
    pricePerOperatorPerDay: 25000 // Precio en pesos colombianos
};

// Función para inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inicializa la aplicación
 */
function initializeApp() {
    // Configurar fecha mínima para el selector de fecha (solo fechas futuras)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    const serviceDateInput = document.getElementById('serviceDate');
    if (serviceDateInput) {
        serviceDateInput.min = minDate;
    }
    
    // Verificar si hay una sesión guardada
    checkExistingSession();
    
    // Configurar event listeners
    setupEventListeners();
}

/**
 * Configura todos los event listeners de la aplicación
 */
function setupEventListeners() {
    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
    
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

/**
 * Muestra el modal de registro
 */
function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    modal.style.display = 'block';
    // Limpiar formulario
    document.getElementById('registerForm').reset();
    clearErrorMessages();
}

/**
 * Muestra el modal de login
 */
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    // Limpiar formulario
    document.getElementById('loginForm').reset();
}

/**
 * Cierra un modal específico
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

/**
 * Cambia del modal de login al modal de registro
 */
function switchToRegister() {
    closeModal('loginModal');
    showRegisterModal();
}

/**
 * Maneja el proceso de registro
 */
function handleRegistration(event) {
    event.preventDefault();
    
    // Limpiar mensajes de error previos
    clearErrorMessages();
    
    // Obtener datos del formulario
    const formData = new FormData(event.target);
    const userData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        street: formData.get('street'),
        number: formData.get('number'),
        city: formData.get('city'),
        zipCode: formData.get('zipCode'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        idDocument: formData.get('idDocument')
    };
    
    // Validar datos
    if (!validateRegistrationData(userData)) {
        return;
    }
    
    // Simular proceso de registro
    simulateRegistration(userData);
}

/**
 * Valida los datos de registro
 */
function validateRegistrationData(userData) {
    let isValid = true;
    
    // Validar nombre completo
    if (!userData.fullName || userData.fullName.trim().length < 2) {
        showFieldError('fullNameError', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailRegex.test(userData.email)) {
        showFieldError('emailError', 'Ingresa un correo electrónico válido');
        isValid = false;
    }
    
    // Validar teléfono
    const phoneRegex = /^[0-9]{10}$/;
    if (!userData.phone || !phoneRegex.test(userData.phone.replace(/\s/g, ''))) {
        showFieldError('phoneError', 'Ingresa un número de teléfono válido (10 dígitos)');
        isValid = false;
    }
    
    // Validar contraseña
    if (!userData.password || userData.password.length < 6) {
        showFieldError('passwordError', 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }
    
    // Validar confirmación de contraseña
    if (userData.password !== userData.confirmPassword) {
        showFieldError('confirmPasswordError', 'Las contraseñas no coinciden');
        isValid = false;
    }
    
    // Validar documento
    if (!userData.idDocument || userData.idDocument.size === 0) {
        showFieldError('idDocumentError', 'Debes subir tu documento de identidad en formato PDF');
        isValid = false;
    } else if (userData.idDocument.type !== 'application/pdf') {
        showFieldError('idDocumentError', 'El documento debe estar en formato PDF');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Simula el proceso de registro
 */
function simulateRegistration(userData) {
    // Mostrar estado de carga
    const submitButton = document.querySelector('#registerForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Registrando...';
    submitButton.disabled = true;
    
    // Simular delay de red
    setTimeout(() => {
        // Guardar usuario en localStorage (simulación)
        const users = JSON.parse(localStorage.getItem('cleanusUsers') || '[]');
        
        // Verificar si el email ya existe
        if (users.find(user => user.email === userData.email)) {
            showFieldError('emailError', 'Este correo electrónico ya está registrado');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            return;
        }
        
        // Agregar nuevo usuario
        const newUser = {
            id: Date.now(),
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            address: {
                street: userData.street,
                number: userData.number,
                city: userData.city,
                zipCode: userData.zipCode
            },
            password: userData.password, // En producción, esto debe ser hasheado
            registrationDate: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('cleanusUsers', JSON.stringify(users));
        
        // Mostrar modal de éxito
        closeModal('registerModal');
        showSuccessModal();
        
        // Restaurar botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
    }, 2000); // Simular 2 segundos de procesamiento
}

/**
 * Muestra el modal de éxito después del registro
 */
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
}

/**
 * Cierra el modal de éxito y abre el modal de login
 */
function closeSuccessModal() {
    closeModal('successModal');
    showLoginModal();
}

/**
 * Maneja el proceso de login
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validar campos
    if (!email || !password) {
        alert('Por favor, completa todos los campos');
        return;
    }
    
    // Simular proceso de login
    simulateLogin(email, password);
}

/**
 * Simula el proceso de login
 */
function simulateLogin(email, password) {
    const submitButton = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Iniciando sesión...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Buscar usuario en localStorage
        const users = JSON.parse(localStorage.getItem('cleanusUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login exitoso
            currentUser = user;
            isLoggedIn = true;
            
            // Guardar sesión
            localStorage.setItem('cleanusCurrentUser', JSON.stringify(user));
            
            // Cerrar modal y mostrar portal
            closeModal('loginModal');
            showUserPortal();
        } else {
            // Login fallido
            alert('Credenciales incorrectas. Verifica tu email y contraseña.');
        }
        
        // Restaurar botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
    }, 1500);
}

/**
 * Verifica si hay una sesión existente al cargar la página
 */
function checkExistingSession() {
    const savedUser = localStorage.getItem('cleanusCurrentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        showUserPortal();
    }
}

/**
 * Muestra el portal de usuario
 */
function showUserPortal() {
    // Ocultar la página principal
    document.querySelector('nav').style.display = 'none';
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.benefits').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    
    // Mostrar portal de usuario
    const portal = document.getElementById('userPortal');
    portal.style.display = 'block';
    
    // Actualizar nombre de usuario
    document.getElementById('userName').textContent = `Bienvenido, ${currentUser.fullName}`;
}

/**
 * Cierra la sesión del usuario
 */
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        currentUser = null;
        isLoggedIn = false;
        localStorage.removeItem('cleanusCurrentUser');
        
        // Mostrar página principal
        document.querySelector('nav').style.display = 'block';
        document.querySelector('.hero').style.display = 'flex';
        document.querySelector('.benefits').style.display = 'block';
        document.querySelector('.about').style.display = 'block';
        
        // Ocultar portal
        document.getElementById('userPortal').style.display = 'none';
        
        // Limpiar formulario de servicio
        document.getElementById('serviceForm').reset();
        document.getElementById('orderSummary').style.display = 'none';
    }
}

/**
 * Calcula el total del servicio
 */
function calculateTotal() {
    const serviceDate = document.getElementById('serviceDate').value;
    const operatorCount = parseInt(document.getElementById('operatorCount').value);
    const serviceDays = parseInt(document.getElementById('serviceDays').value);
    
    // Validar que todos los campos estén completos
    if (!serviceDate || !operatorCount || !serviceDays) {
        alert('Por favor, completa todos los campos para calcular el total');
        return;
    }
    
    // Validar que la fecha sea futura
    const selectedDate = new Date(serviceDate);
    const today = new Date();
    if (selectedDate <= today) {
        alert('La fecha del servicio debe ser posterior a hoy');
        return;
    }
    
    // Calcular total
    const total = operatorCount * serviceDays * PRICING.pricePerOperatorPerDay;
    
    // Mostrar orden de cobro
    displayOrderSummary(serviceDate, operatorCount, serviceDays, total);
}

/**
 * Muestra el resumen de la orden
 */
function displayOrderSummary(date, operators, days, total) {
    // Formatear fecha
    const formattedDate = new Date(date).toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Actualizar elementos del DOM
    document.getElementById('orderDate').textContent = formattedDate;
    document.getElementById('orderOperators').textContent = `${operators} operario${operators > 1 ? 's' : ''}`;
    document.getElementById('orderDays').textContent = `${days} día${days > 1 ? 's' : ''}`;
    document.getElementById('orderTotal').textContent = formatCurrency(total);
    
    // Mostrar resumen
    document.getElementById('orderSummary').style.display = 'block';
    
    // Scroll hasta el resumen
    document.getElementById('orderSummary').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

/**
 * Procesa el pago (simulado)
 */
function processPayment() {
    if (confirm('¿Confirmas que deseas proceder con el pago de este servicio?')) {
        // Simular procesamiento de pago
        const payButton = document.querySelector('#orderSummary .btn-primary');
        const originalText = payButton.textContent;
        payButton.textContent = 'Procesando pago...';
        payButton.disabled = true;
        
        setTimeout(() => {
            // Simular pago exitoso
            showConfirmationModal();
            
            // Limpiar formulario
            document.getElementById('serviceForm').reset();
            document.getElementById('orderSummary').style.display = 'none';
            
            // Restaurar botón
            payButton.textContent = originalText;
            payButton.disabled = false;
            
        }, 3000); // Simular 3 segundos de procesamiento
    }
}

/**
 * Muestra el modal de confirmación de solicitud exitosa
 */
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';
}

/**
 * Desplaza suavemente a una sección específica
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Muestra un mensaje de error en un campo específico
 */
function showFieldError(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Limpia todos los mensajes de error
 */
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

/**
 * Formatea un número como moneda colombiana
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Valida un archivo PDF
 */
function validatePDFFile(file) {
    if (!file) return false;
    
    // Verificar tipo de archivo
    if (file.type !== 'application/pdf') {
        return false;
    }
    
    // Verificar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
        showFieldError('idDocumentError', 'El archivo es demasiado grande. Máximo 5MB.');
        return false;
    }
    
    return true;
}

/**
 * Maneja la subida de archivos
 */
document.addEventListener('change', function(event) {
    if (event.target.id === 'idDocument') {
        const file = event.target.files[0];
        if (file && !validatePDFFile(file)) {
            event.target.value = ''; // Limpiar el input
        }
    }
});

/**
 * Funciones de utilidad para mejorar la experiencia de usuario
 */

// Función para validar email en tiempo real
function validateEmailRealTime(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar teléfono en tiempo real
function validatePhoneRealTime(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Event listeners para validación en tiempo real
document.addEventListener('input', function(event) {
    const target = event.target;
    
    // Validación de email
    if (target.id === 'email') {
        const errorElement = document.getElementById('emailError');
        if (target.value && !validateEmailRealTime(target.value)) {
            showFieldError('emailError', 'Formato de email inválido');
        } else {
            errorElement.style.display = 'none';
        }
    }
    
    // Validación de teléfono
    if (target.id === 'phone') {
        const errorElement = document.getElementById('phoneError');
        if (target.value && !validatePhoneRealTime(target.value)) {
            showFieldError('phoneError', 'Debe contener 10 dígitos');
        } else {
            errorElement.style.display = 'none';
        }
    }
    
    // Validación de confirmación de contraseña
    if (target.id === 'confirmPassword') {
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('confirmPasswordError');
        if (target.value && target.value !== password) {
            showFieldError('confirmPasswordError', 'Las contraseñas no coinciden');
        } else {
            errorElement.style.display = 'none';
        }
    }
});

/**
 * Manejo del menú hamburguesa para dispositivos móviles
 */
document.addEventListener('click', function(event) {
    if (event.target.closest('.hamburger')) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    }
});

// Cerrar menú móvil al hacer clic en un enlace
document.addEventListener('click', function(event) {
    if (event.target.matches('.nav-menu a')) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    }
});

/**
 * Función para mostrar notificaciones toast (opcional)
 */
function showToast(message, type = 'info') {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Estilos inline para el toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease'
    });
    
    // Color según el tipo
    switch(type) {
        case 'success':
            toast.style.backgroundColor = '#28a745';
            break;
        case 'error':
            toast.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            toast.style.backgroundColor = '#ffc107';
            toast.style.color = '#212529';
            break;
        default:
            toast.style.backgroundColor = '#17a2b8';
    }
    
    // Agregar al DOM
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Exportar funciones principales para uso global
window.showRegisterModal = showRegisterModal;
window.showLoginModal = showLoginModal;
window.closeModal = closeModal;
window.switchToRegister = switchToRegister;
window.closeSuccessModal = closeSuccessModal;
window.logout = logout;
window.calculateTotal = calculateTotal;
window.processPayment = processPayment;
window.scrollToSection = scrollToSection; 