<?php
// Connexion à la base de données
$servername = "localhost";
$username = "nom_utilisateur";
$password = "mot_de_passe";
$dbname = "covoituragefac";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Définir le mode d'erreur PDO à exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie";
} catch(PDOException $e) {
    echo "Connexion échouée : " . $e->getMessage();
}

// Récupérer les éléments de la base de données
$stmt = $conn->query("SELECT * FROM participants");
$participants = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Insérer de nouveaux éléments dans la base de données
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['participant_name']) && isset($_POST['gender']) && isset($_POST['age']) && isset($_POST['destination'])) {
        $participant_name = $_POST['participant_name'];
        $gender = $_POST['gender'];
        $age = $_POST['age'];
        $destination = $_POST['destination'];

        // Préparation de la requête SQL pour l'insertion
        $stmt = $conn->prepare("INSERT INTO participants (name, gender, age, destination) VALUES (:name, :gender, :age, :destination)");
        $stmt->bindParam(':name', $participant_name);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':age', $age);
        $stmt->bindParam(':destination', $destination);

        // Exécution de la requête
        $stmt->execute();

        echo "Nouveau participant inséré avec succès.";
    } else {
        echo "Données manquantes pour l'insertion.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage a journey</title>
</head>
<body>
    <div class="container">
        <h1>Manage a journey</h1>
        <p class="journey-info">Journey: 20/02/24 Annaba/Setif</p>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Destination</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($participants as $participant): ?>
                    <tr>
                        <td><?= htmlspecialchars($participant['name']) ?></td>
                        <td><?= htmlspecialchars($participant['gender']) ?></td>
                        <td><?= htmlspecialchars($participant['age']) ?></td>
                        <td><?= htmlspecialchars($participant['destination']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <input type="text" name="participant_name" placeholder="Name">
            <input type="text" name="gender" placeholder="Gender">
            <input type="text" name="age" placeholder="Age">
            <input type="text" name="destination" placeholder="Destination">
            <button type="submit">Ajouter participant</button>
        </form>
        <button class="return-btn">Return</button>
    </div>
</body>
</html>
