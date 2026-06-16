-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 15 juin 2026 à 15:45
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_patients`
--

-- --------------------------------------------------------

--
-- Structure de la table `consultations`
--

CREATE TABLE `consultations` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `date_consultation` datetime DEFAULT NULL,
  `motif` text DEFAULT NULL,
  `diagnostic` text DEFAULT NULL,
  `traitement` text DEFAULT NULL,
  `observations` text DEFAULT NULL,
  `poids` decimal(5,2) DEFAULT NULL,
  `taille` decimal(5,2) DEFAULT NULL,
  `tension` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `rendez_vous_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `consultations`
--

INSERT INTO `consultations` (`id`, `patient_id`, `doctor_id`, `date_consultation`, `motif`, `diagnostic`, `traitement`, `observations`, `poids`, `taille`, `tension`, `created_at`, `rendez_vous_id`) VALUES
(1, 2, 0, '2026-06-13 00:00:00', 'hello', 'kkkk', 'lll', 'kkk', NULL, NULL, NULL, '2026-06-12 07:50:12', NULL),
(2, 2, 14, '2026-06-14 00:00:00', 'FIEVRE', 'k', 'l', 'p', NULL, NULL, NULL, '2026-06-14 14:31:40', 3),
(3, 1, 14, '2026-06-15 00:00:00', 'kkkk', 'olo', 'ilokj', 'uko', NULL, NULL, NULL, '2026-06-14 14:32:22', 5);

-- --------------------------------------------------------

--
-- Structure de la table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `specialite` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `statut` varchar(20) DEFAULT 'Actif',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `doctors`
--

INSERT INTO `doctors` (`id`, `nom`, `prenom`, `specialite`, `telephone`, `email`, `statut`, `created_at`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:43'),
(2, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:44'),
(3, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:44'),
(4, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:44'),
(5, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:45'),
(6, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:45'),
(7, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:45'),
(8, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:45'),
(9, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:45'),
(10, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:46'),
(11, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:46'),
(12, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:55:46'),
(13, NULL, NULL, NULL, NULL, NULL, 'Actif', '2026-06-12 14:57:53'),
(14, 'thierrybryan', 'andrianilana', 'Cardiologue', '0349543008', 'andrianilanathierrybryan@gmail.com', 'Actif', '2026-06-12 14:59:19');

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `sexe` enum('M','F') NOT NULL,
  `date_naissance` date NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `adresse` text DEFAULT NULL,
  `groupe_sanguin` varchar(5) DEFAULT NULL,
  `contact_urgence` varchar(100) DEFAULT NULL,
  `telephone_urgence` varchar(20) DEFAULT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_modification` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`id`, `nom`, `prenom`, `sexe`, `date_naissance`, `telephone`, `adresse`, `groupe_sanguin`, `contact_urgence`, `telephone_urgence`, `date_creation`, `date_modification`) VALUES
(1, 'xender', 'andrianilana', 'M', '2005-11-10', '0349745608', '42GH+QJX', 'O+', 'LOVA', '0387844296', '2026-06-09 12:56:54', '2026-06-11 08:12:36'),
(2, 'Xi', 'andrianilana', 'M', '2006-05-23', '0349543008', '42GH+QJX', 'A+', 'KEV4S', '0387844296', '2026-06-09 12:58:17', '2026-06-15 13:02:41');

-- --------------------------------------------------------

--
-- Structure de la table `rendez_vous`
--

CREATE TABLE `rendez_vous` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `date_rdv` date NOT NULL,
  `heure_rdv` time NOT NULL,
  `motif` varchar(255) NOT NULL,
  `statut` enum('En attente','Confirmé','Annulé') DEFAULT 'En attente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `doctor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `rendez_vous`
--

INSERT INTO `rendez_vous` (`id`, `patient_id`, `date_rdv`, `heure_rdv`, `motif`, `statut`, `created_at`, `doctor_id`) VALUES
(1, 2, '2026-06-13', '13:00:00', 'MARARY', 'Annulé', '2026-06-11 07:59:50', 14),
(3, 2, '2026-06-14', '14:01:00', 'FIEVRE', '', '2026-06-13 16:51:25', 14),
(4, 1, '2026-06-16', '20:03:00', 'MST', 'Annulé', '2026-06-13 17:02:58', 14),
(5, 1, '2026-06-15', '13:04:00', 'kkkk', '', '2026-06-13 17:58:54', 14),
(6, 2, '2026-06-17', '16:44:00', 'kloo', 'Confirmé', '2026-06-14 13:44:24', 14);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','medecin','reception') DEFAULT 'reception',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Administrateur', 'admin@gmail.com', '$2y$10$8sdf9sdf9sdf...', 'admin', '2026-06-13 14:45:45');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `consultations`
--
ALTER TABLE `consultations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `consultations`
--
ALTER TABLE `consultations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD CONSTRAINT `rendez_vous_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
