import { User } from './entities/User.entity';

export function generateApproveEmail(newUser: User, approveLink: string): string {
    return `
        <p>Hola,</p>
        <p>Datos de registro nuevo:</p>
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
        <p>Para aprobar la solicitud presione el botón.</p>
        <p><a href="${approveLink}" target="_blank" style="
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #FFFFFF;
            background-color: #F50002;
            text-decoration: none;
            border-radius: 5px;
        ">Aprobar solicitud</a></p>
    `;
}