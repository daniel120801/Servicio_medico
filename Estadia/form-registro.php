<!doctype html>
<html lang="es">

<head>
    <title>Registro de Asistentes</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>

<body class="bg-light d-flex mt-5" style="min-height: 100vh;">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4">
                <div class="card shadow-lg border-0">
                    <div class="card-body">
                        <h3 class="card-title text-center mb-4">Registro de Asistente</h3>
                        <form id="registroForm" autocomplete="off">
                            <div class="mb-3">
                                <label for="matricula" class="form-label">Matrícula</label>
                                <input type="number" class="form-control" id="matricula" name="matricula" maxlength="8" required placeholder="Ej: 12345678" />
                                <div class="form-text">Máximo 8 caracteres, solo números.</div>
                            </div>
                            <input type="hidden" id="conferencia_id" name="conferencia_id" />
                            <button type="submit" class="btn btn-primary w-100">Registrar</button>
                        </form>
                        <div id="mensaje" class="mt-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Obtener el ID de la conferencia de la URL
        function obtenerIdConferenciaDeURL() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('conferencia_id') || '1'; // Cambiado a 'conferencia_id'
        }

        // Establecer el valor del campo conferencia_id al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            const conferenciaId = obtenerIdConferenciaDeURL();
            document.getElementById('conferencia_id').value = conferenciaId;

            // Opcional: Mostrar en consola para depuración
            console.log('ID de conferencia establecido:', conferenciaId);
        });

        document.getElementById('registroForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const mensaje = document.getElementById('mensaje');
            mensaje.innerHTML = "";

            const matricula = document.getElementById('matricula').value;
            const conferencia_id = document.getElementById('conferencia_id').value;

            // Opcional: Verificar valores antes de enviar
            console.log('Enviando datos:', {
                matricula,
                conferencia_id
            });

            fetch('API/conferencia.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        accion: 'registrarAsistencia',
                        matricula: matricula,
                        conferencia_id: conferencia_id
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.resultado) {
                        mensaje.innerHTML = '<div class="alert alert-success">Asistencia registrada correctamente.</div>';
                        document.getElementById('registroForm').reset();
                    } else {
                        mensaje.innerHTML = `<div class="alert alert-danger">${data.error || 'Error al registrar asistencia.'}</div>`;
                    }
                })
                .catch(() => {
                    mensaje.innerHTML = '<div class="alert alert-danger">Error de conexión con el servidor.</div>';
                });
        });
    </script>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>