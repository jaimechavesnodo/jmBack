import { User } from 'user/entities/user.entity';


export const getApproveEmailTemplate = (newUser: User) => {


    return `
        <p>¡Hola!</p>
        <p>Un nuevo usuario ha activado su cuenta para participar en el plan de Privilegios, a
        continuación encontrarás los datos del funcionario que ingresó al programa:</p>
        <ul>
            <li><strong>Nombre:</strong> ${newUser.name}</li>
            <li><strong>Apellido:</strong> ${newUser.lastName}</li>
            <li><strong>Identificación:</strong> ${newUser.identification}</li>
            <li><strong>Tipo de Documento:</strong> ${newUser.typeDocument}</li>
            <li><strong>Teléfono:</strong> ${newUser.phone}</li>
            <li><strong>Email Corporativo:</strong> ${newUser.corporateEmail}</li>
            <li><strong>Email Secundario:</strong> ${newUser.secondaryEmail}</li>
            <li><strong>Empresa:</strong> ${newUser.company}</li>
            <li><strong>Fecha de Nacimiento:</strong> ${newUser.birthdayDate}</li>
            <li><strong>Teléfono Personal:</strong> ${newUser.personalPhone}</li>
            <li><strong>Rol:</strong> ${newUser.role}</li>
        </ul>
        <br>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>
    `;
};


export const getSendRegistrationUser = () => {
    return `
        <p>¡Hola!</p>
        <p>Desde ahora puedes ingresar a nuestro portal https://jmfront.azurewebsites.net .
        Recuerda guardar usuario y contraseña para acceder a todos los beneficios del
        plan de Privilegios.</p>
        <br>
        <div style="text-align: center;">
            <img src="https://drive.google.com/file/d/1UQwehCe6SzbWqcJNcyjRKSSyZby1rd3Q/view?usp=sharing" alt="Imagen de cabecera" style="max-width: 100%; height: auto;">
        </div>
        <br>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>
    `;
};

export const getApprovalConfirmationEmailTemplate = (user: User) => {
    return `
        <p>¡Hola ${user.name}!</p>
        <p>Desde ahora puedes ingresar a nuestro portal https://jmfront.azurewebsites.net/ . 
        Recuerda guardar usuario y contraseña para acceder a todos los beneficios del plan de Privilegios.</p>
        <br>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>
    `;
};


export const getRecoverPasswordEmailTemplate = (name: string, id: number, frontendBaseUrl: string) => {
    const resetPasswordLink = `${frontendBaseUrl}/crear-contrasena/${encodeURIComponent(id)}`;

    return `
        <p>¡Hola ${name}!</p>
        <p>Hemos recibido tu solicitud para realizar el cambio de tu contraseña, 
        por favor presiona el botón para continuar con el proceso:</p>
        <div style="display: flex; justify-content: center; ">
            <a href="${resetPasswordLink}" target="_blank" style="
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #FFFFFF;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
                margin-right: 10px;
            ">Cambiar Contraseña</a>
        </div>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>

    `;
};


export const getSendPasswordConfirmationEmail = (user: User) => {
    return `
        <p>¡Hola ${user.name}!</p>
        <p>JMalucelli Travelers Seguros informa que se ha realizado exitosamente el cambio de la contraseña.</p>
        <br>
        <div style="text-align: center;">
            <img src="https://drive.google.com/file/d/1yA9VRueg-61xReycBIB_yhn42CDuaW0n/view?usp=sharing" alt="Imagen de cabecera" style="max-width: 100%; height: auto;">
        </div>
        <br>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>
    `;
};


export const getSendDeclineUserEmail = (user: User) => {
    return `
        <p>¡Hola ${user.name}!</p>
        <p>Queremos informar que el proceso de registro en el plan de Privilegios, no fue
        exitoso. Pero te invitamos a contactar a tu asesor comercial de JMalucelli
        Travelers Seguros, y ampliar información para realizar el registro de una forma
        exitosa.</p>
        <p>Te esperamos de nuevo.</ p>
        <br>
        <br>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>
    `;
};

