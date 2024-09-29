const username = document.getElementById("username");
const password = document.getElementById("password");
const profilePicture = document.getElementById("image");
let imageProfile = "";

const btnRegister = document.getElementById("chip-seal");

btnRegister.addEventListener('click', (e) => {
    e.preventDefault();

    if (!username.value) {
        username.placeholder = "USER NAME IS REQUIRED";
        username.classList.add('red-letter');
        username.style.border = "2px solid #FF0000";
    }

    if (!password.value) {
        password.placeholder = "PASSWORD IS REQUIRED";
        password.classList.add('red-letter');
        password.style.border = "2px solid #FF0000";
    }

    if (username.value && password.value) {
        const formData = new FormData();

        if (imageProfile) {
            formData.append('image', imageProfile);
        }

        formData.append('username', username.value);
        formData.append('password', password.value);
        formData.append('role', 'user');

        fetch('http://localhost:3000/api/v1/register', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.status === 409) { // Si el estado es 409, el usuario ya existe
                throw new Error("Username is already taken");
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "User has been created") {
                console.log('Registro exitoso:', data);
                localStorage.setItem('stage', 'new register');
                window.location.href = '../../map/index.html';
            }
        })
        .catch(error => {
            if (error.message === "Username is already taken") {
                showErrorModal("Username is already taken. Please choose another one.");
            } else {
                showErrorModal(error.message)
                //showErrorModal("An error occurred while registering. Please try again later.");
            }
        });
    }
});

// Función para manejar la selección de imagen
function upload() {
    const fileUploadInput = document.querySelector('.file-uploader');
    const image = fileUploadInput.files[0];
  
    if (!image.type.includes('image')) {
        return alert('Only images are allowed!');
    }
  
    if (image.size > 10_000_000) {
        return alert('Maximum upload size is 10MB!');
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    fileReader.onload = (fileReaderEvent) => {
        profilePicture.style.backgroundImage = `url(${fileReaderEvent.target.result})`;
    }

    imageProfile = image;
}

// Función para mostrar un modal de error
function showErrorModal(message) {
    const modal = document.getElementById("errorModal");
    const modalMessage = document.getElementById("modalMessage");

    modalMessage.textContent = message;
    modal.style.display = "block";

    // Cuando el usuario haga clic en cualquier lugar fuera del modal, cierra el modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
