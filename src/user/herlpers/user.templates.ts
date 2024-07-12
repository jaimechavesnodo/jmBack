import { User } from 'user/entities/user.entity';


export const getApproveEmailTemplate = (newUser: User, baseUrl: string) => {
    const approveLink = `${baseUrl}/User/approveEmail/${encodeURIComponent(newUser.id)}`;
    const rejectLink = `${baseUrl}/User/declineUser/${encodeURIComponent(newUser.id)}`;

    return `
        <p>¡Hola!</p>
        <p>Hemos recibido una nueva solicitud de registro para participar en el plan de Privilegios, a
        continuación encontrarás los datos del funcionario que desea ingresar al programa:</p>
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
        <p>Por favor haz clic en el botón verde si deseas aprobar su solicitud de registro, o haz clic en
        el botón rojo si deseas rechazar su solicitud de registro.</p>
        <br>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>
        <div style="display: flex; justify-content: center; ">
            <a href="${approveLink}" target="_blank" style="
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #FFFFFF;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
                margin-right: 10px;
            ">Aprobar solicitud</a>

            <a href="${rejectLink}" target="_blank" style="
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #FFFFFF;
                background-color: #F50002;
                text-decoration: none;
                border-radius: 5px;
                margin-left: 10px; 
            ">Rechazar solicitud</a>
        </div>
    `;
};

export const getApprovalConfirmationEmailTemplate = (user: User) => {
    return `
        <p>¡Hola ${user.name}!</p>
        <p>Desde ahora puedes ingresar a nuestro portal (poner el link). 
        Recuerda guardar usuario y contraseña para acceder a todos los beneficios del plan de Privilegios.</p>
        <br>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>
    `;
};


export const getRecoverPasswordEmailTemplate = (name: string, id: number, frontendBaseUrl: string) => {
    const resetPasswordLink = `${frontendBaseUrl}/reset-password?userId=${encodeURIComponent(id)}`;

    return `
        <p>¡Hola ${name}!</p>
        <p>Hemos recibido tu solicitud para realizar el cambio de tu contraseña, 
        por favor ingresa al siguiente enlace para continuar con el proceso:</p>
        <br>
        <p><a href="${resetPasswordLink}" target="_blank">${resetPasswordLink}</a></p>
        <br>
        <p>Equipo Soporte</p>
        <p>JMalucelli Travelers Seguros.</p>

    `;
};


export const getSendPasswordConfirmationEmail = (user: User) => {
    return `
        <p>¡Hola ${user.name}!</p>
        <p>JMalucelli Travelers Seguros informa que se ha realizado exitosamente el cambio de la contraseña.</p>
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
