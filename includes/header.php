<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="LuxeStay Hotel - Your Luxury Escape. Book premium rooms and suites with exceptional service.">
    <meta name="keywords" content="hotel, luxury, booking, accommodation, rooms, suites">
    <title><?php echo isset($pageTitle) ? $pageTitle . ' | LuxeStay Hotel' : 'LuxeStay Hotel - Your Luxury Escape'; ?></title>

    <!-- Stylesheets -->
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="/assets/css/components.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/images/favicon.png">

    <?php if (isset($additionalStyles)): ?>
        <?php foreach ($additionalStyles as $style): ?>
            <link rel="stylesheet" href="<?php echo $style; ?>">
        <?php endforeach; ?>
    <?php endif; ?>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar <?php echo isset($navbarClass) ? $navbarClass : ''; ?>">
        <div class="navbar-container">
            <!-- Logo -->
            <div class="logo">
                <a href="/">
                    <span class="logo-text">LuxeStay</span>
                </a>
            </div>

            <!-- Navigation Menu -->
            <div class="nav-menu">
                <ul class="nav-ul">
                    <li class="<?php echo (isset($currentPage) && $currentPage === 'home') ? 'active' : ''; ?>">
                        <a href="/">Home</a>
                    </li>
                    <li class="<?php echo (isset($currentPage) && $currentPage === 'rooms') ? 'active' : ''; ?>">
                        <a href="/public/rooms.html">Rooms</a>
                    </li>
                    <li class="<?php echo (isset($currentPage) && $currentPage === 'about') ? 'active' : ''; ?>">
                        <a href="/about.html">About</a>
                    </li>
                    <li class="<?php echo (isset($currentPage) && $currentPage === 'contact') ? 'active' : ''; ?>">
                        <a href="/contact.html">Contact</a>
                    </li>
                    <!-- Profile link (shown only when logged in, managed by JS) -->
                    <li class="profile-link" style="display: none;">
                        <a href="/public/profile.html">Profile</a>
                    </li>
                </ul>
            </div>

            <!-- Credentials (Login/Signup or User Dropdown) -->
            <div class="credentials">
                <a href="/public/login.html" class="button-secondary">Login</a>
                <a href="/public/login.html?tab=register" class="button-primary">Sign Up</a>
            </div>

            <!-- Hamburger Menu (Mobile) -->
            <div class="hamburger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
