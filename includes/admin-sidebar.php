<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle . ' - LuxeStay Admin' : 'LuxeStay Admin Dashboard'; ?></title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/images/favicon.png">

    <!-- CSS -->
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="/assets/css/components.css">
    <link rel="stylesheet" href="/assets/css/admin.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Chart.js -->
    <?php if (isset($includeCharts) && $includeCharts): ?>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <?php endif; ?>

    <!-- Additional CSS if needed -->
    <?php if (isset($additionalCSS)): ?>
        <?php foreach ($additionalCSS as $css): ?>
            <link rel="stylesheet" href="<?php echo $css; ?>">
        <?php endforeach; ?>
    <?php endif; ?>
</head>
<body>

<div class="admin-layout">
    <!-- Admin Sidebar -->
    <aside class="admin-sidebar">
        <!-- Logo -->
        <div class="sidebar-logo">
            <div class="sidebar-logo-icon">LS</div>
            <span class="sidebar-logo-text">LuxeStay</span>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
            <!-- Main Section -->
            <div class="sidebar-nav-section">
                <div class="sidebar-nav-title">Main</div>
                <ul class="sidebar-nav-list">
                    <li class="sidebar-nav-item">
                        <a href="/admin/dashboard.html" class="sidebar-nav-link <?php echo (isset($activePage) && $activePage === 'dashboard') ? 'active' : ''; ?>">
                            <span class="sidebar-nav-icon"><i class="fas fa-home"></i></span>
                            <span class="sidebar-nav-text">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Management Section -->
            <div class="sidebar-nav-section">
                <div class="sidebar-nav-title">Management</div>
                <ul class="sidebar-nav-list">
                    <li class="sidebar-nav-item">
                        <a href="/admin/employee-dashboard.html?view=rooms" class="sidebar-nav-link <?php echo (isset($activePage) && $activePage === 'rooms') ? 'active' : ''; ?>">
                            <span class="sidebar-nav-icon"><i class="fas fa-bed"></i></span>
                            <span class="sidebar-nav-text">Rooms</span>
                        </a>
                    </li>
                    <li class="sidebar-nav-item">
                        <a href="/admin/employee-dashboard.html?view=bookings" class="sidebar-nav-link <?php echo (isset($activePage) && $activePage === 'bookings') ? 'active' : ''; ?>">
                            <span class="sidebar-nav-icon"><i class="fas fa-calendar-check"></i></span>
                            <span class="sidebar-nav-text">Bookings</span>
                            <?php if (isset($newBookings) && $newBookings > 0): ?>
                                <span class="sidebar-nav-badge"><?php echo $newBookings; ?></span>
                            <?php endif; ?>
                        </a>
                    </li>
                    <li class="sidebar-nav-item">
                        <a href="/admin/employee-dashboard.html?view=customers" class="sidebar-nav-link <?php echo (isset($activePage) && $activePage === 'customers') ? 'active' : ''; ?>">
                            <span class="sidebar-nav-icon"><i class="fas fa-users"></i></span>
                            <span class="sidebar-nav-text">Customers</span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Account Section -->
            <div class="sidebar-nav-section">
                <div class="sidebar-nav-title">Account</div>
                <ul class="sidebar-nav-list">
                    <li class="sidebar-nav-item">
                        <a href="/admin/profile-dashboard.html" class="sidebar-nav-link <?php echo (isset($activePage) && $activePage === 'profile') ? 'active' : ''; ?>">
                            <span class="sidebar-nav-icon"><i class="fas fa-user"></i></span>
                            <span class="sidebar-nav-text">Profile</span>
                        </a>
                    </li>
                    <li class="sidebar-nav-item">
                        <a href="/admin/settings.html" class="sidebar-nav-link <?php echo (isset($activePage) && $activePage === 'settings') ? 'active' : ''; ?>">
                            <span class="sidebar-nav-icon"><i class="fas fa-cog"></i></span>
                            <span class="sidebar-nav-text">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Logout -->
        <div class="sidebar-footer">
            <button class="sidebar-logout" onclick="window.location.href='/logout.php'">
                <span class="sidebar-logout-icon"><i class="fas fa-sign-out-alt"></i></span>
                <span class="sidebar-logout-text">Logout</span>
            </button>
        </div>
    </aside>

    <!-- Sidebar Overlay (Mobile) -->
    <div class="sidebar-overlay"></div>

    <!-- Main Content Area -->
    <main class="admin-main">
        <!-- Top Bar -->
        <div class="admin-topbar">
            <div class="topbar-left">
                <button class="topbar-toggle">
                    <i class="fas fa-bars"></i>
                </button>
                <h1 class="topbar-title"><?php echo isset($pageTitle) ? $pageTitle : 'Dashboard'; ?></h1>
            </div>

            <div class="topbar-right">
                <!-- Search -->
                <div class="topbar-search">
                    <input type="text" class="topbar-search-input" placeholder="Search...">
                    <i class="fas fa-search topbar-search-icon"></i>
                </div>

                <!-- Notifications -->
                <div class="topbar-notifications dropdown">
                    <button class="topbar-notifications-btn">
                        <i class="fas fa-bell"></i>
                        <?php if (isset($notificationCount) && $notificationCount > 0): ?>
                            <span class="topbar-notifications-badge"><?php echo $notificationCount; ?></span>
                        <?php endif; ?>
                    </button>
                </div>

                <!-- User Profile -->
                <div class="topbar-user dropdown">
                    <div class="dropdown-toggle">
                        <img src="<?php echo isset($userAvatar) ? $userAvatar : '/assets/images/default-avatar.png'; ?>" alt="User" class="topbar-user-avatar">
                        <div class="topbar-user-info">
                            <div class="topbar-user-name"><?php echo isset($userName) ? $userName : 'Admin User'; ?></div>
                            <div class="topbar-user-role"><?php echo isset($userRole) ? $userRole : 'Administrator'; ?></div>
                        </div>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="dropdown-menu">
                        <a href="/admin/profile-dashboard.html" class="dropdown-item">
                            <i class="fas fa-user"></i> My Profile
                        </a>
                        <a href="/admin/settings.html" class="dropdown-item">
                            <i class="fas fa-cog"></i> Settings
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="/logout.php" class="dropdown-item">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Admin Content -->
        <div class="admin-content">
