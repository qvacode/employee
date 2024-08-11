export function generateAssignmentEmailTemplate(managerName: string, employeeName: string, evaluationId: string): string {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hola, ${managerName}</h2>
            <p>Se te ha asignado una nueva evaluación para el empleado <strong>${employeeName}</strong>.</p>
            <p>Por favor, revisa la evaluación con el ID <strong>${evaluationId}</strong> y califica las respuestas cuando sea posible.</p>
            <p>Gracias por tu colaboración.</p>
            <br>
            <p>Saludos,</p>
            <p>El equipo de RR.HH</p>
        </div>
    `;
}

export function generateUserEvaluationTemplate(userName: string, evaluationId: string): string {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hola, ${userName}</h2>
            <p>Se ha creado una nueva evaluación que necesitas completar.</p>
            <p><strong>Detalles de la Evaluación:</strong></p>
            <ul>
                <li><strong>ID de Evaluación:</strong> ${evaluationId}</li>
            </ul>
            <p>Por favor, asegúrate de completar la evaluación antes de enviarla.</p>
            <p>Puedes acceder a la evaluación en la plataforma utilizando tu cuenta.</p>
            <br>
            <p>Gracias por tu colaboración.</p>
            <br>
            <p>Saludos,</p>
            <p>El equipo de RR.HH</p>
        </div>
    `;
}

