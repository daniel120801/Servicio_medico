<!doctype html>
<html lang="es">

<head>
    <title>Registro de Asistentes</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
</head>

<body class="bg-light d-flex mt-5" style="min-height: 100vh;">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4">
                <div class="card shadow-lg border-0">
                    <div class="card-body">
                        <h3 class="card-title text-center mb-4">Registro de Asistente</h3>
                        <form id="registroForm" action="form-registro.php" method="post">
                       <div class="mb-3">
                        <label for="matricula" class="form-label">Matrícula</label>
                        <input type="number" class="form-control" id="matricula" name="matricula" maxlength="8" required placeholder="Ej: 12345678" />
                        <div class="form-text">Máximo 8 caracteres, solo números.</div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Registrar</button>
                </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

   <script>
    const ubicacionPermitida = {
        lat: 28.571749877871614,
        lng: -100.61571255493632,
        radio: 200 // metros
    };

    function calcularDistancia(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    document.getElementById('registroForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previene envío inmediato

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const distancia = calcularDistancia(
                    position.coords.latitude,
                    position.coords.longitude,
                    ubicacionPermitida.lat,
                    ubicacionPermitida.lng
                );
                if (distancia <= ubicacionPermitida.radio) {
                    alert("Registro permitido.");
                    event.target.submit(); // Enviar formulario manualmente
                } else {
                    alert("No estás en la ubicación permitida para registrarte.");
                }
            }, function(error) {
                alert("No se pudo obtener la ubicación.");
            });
        } else {
            alert("La geolocalización no es soportada por este navegador.");
        }
    });
</script>


    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js " integrity="sha384-ENjdO4Dr2bkBIFxQpeo5syfA1t9gIM1DF+62U5c1xYj3zjUE7z+zF+KXUlA4H9yT " crossorigin="anonymous "></script>
</body>

</html>