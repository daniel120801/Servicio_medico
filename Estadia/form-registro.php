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
                        <form action="form-registro.php" method="post">
                            <div class="mb-3">
                                <label for="matricula" class="form-label">Matrícula</label>
                                <input type="number" class="form-control" id="matricula" name="matricula" maxlength="8" required placeholder="Ej: 12345678 " />
                                <div class="form-number ">Máximo 8 caracteres, solo números.</div>
                            </div>
                            <button type="submit " class="btn btn-primary w-100 ">Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const LAT_PERMITIDA = 28.572440; // Latitud 
        const LNG_PERMITIDA = -100.615361; // Longitud 
        const RADIO_METROS = 300; // Rango permitido en metros

        function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
            const R = 6371000; // Radio de la tierra en metros
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        }

        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            let ubicacionValida = false;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const distancia = getDistanceFromLatLonInMeters(lat, lng, LAT_PERMITIDA, LNG_PERMITIDA);
                    if (distancia <= RADIO_METROS) {
                        ubicacionValida = true;
                    } else {
                        alert('Debes estar en las instalaciones de la UTNC para registrarte.');
                        form.querySelector('button[type="submit"]').disabled = true;
                    }
                }, function(error) {
                    alert('No se pudo obtener tu ubicación. No puedes registrarte.');
                    form.querySelector('button[type="submit"]').disabled = true;
                });
            } else {
                alert('Tu navegador no soporta geolocalización.');
                form.querySelector('button[type="submit"]').disabled = true;
            }

            form.addEventListener('submit', function(e) {
                if (!ubicacionValida) {
                    e.preventDefault();
                    alert('No puedes registrarte fuera de la UTNC.');
                }
            });
        });
    </script>


    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js " integrity="sha384-ENjdO4Dr2bkBIFxQpeo5syfA1t9gIM1DF+62U5c1xYj3zjUE7z+zF+KXUlA4H9yT " crossorigin="anonymous "></script>
</body>

</html>