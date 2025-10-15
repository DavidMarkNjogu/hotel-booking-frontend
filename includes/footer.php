<!-- Footer -->
<footer class="footer">
    <div class="footer-container">
        <!-- Top Section -->
        <div class="top flex jcsb aic">
            <div>
                <h3 class="footer-title"><span>Luxe</span>Stay</h3>
                <p>Your premium hotel booking experience. Discover comfort, luxury, and exceptional service.</p>
            </div>
            <div class="flex gap-20">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook fa-2x"></i></a>
                <a href="#" aria-label="Twitter"><i class="fab fa-twitter fa-2x"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram fa-2x"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin fa-2x"></i></a>
            </div>
        </div>

        <!-- Full Width HR -->
        <hr class="full-width-hr">

        <!-- Navigation Section -->
        <div class="footer-nav flex jcc">
            <ul class="nav-ul flex">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/public/rooms.html">Rooms</a></li>
                <li><a href="/index.html#about">About</a></li>
                <li><a href="/index.html#contact">Contact</a></li>
                <li><a href="/public/login.html">Login</a></li>
            </ul>
        </div>

        <!-- Full Width HR -->
        <hr class="full-width-hr">

        <!-- Bottom Section -->
        <div class="footnote flex jcsb aic">
            <p>&copy; <?php echo date('Y'); ?> LuxeStay Hotel. All rights reserved.</p>
            <div class="flex gap-20">
                <a href="/privacy-policy.html">Privacy Policy</a>
                <a href="/terms-conditions.html">Terms & Conditions</a>
            </div>
        </div>
    </div>
</footer>

<!-- JavaScript -->
<script src="/assets/js/main.js"></script>

<!-- Additional JavaScript if needed -->
<?php if (isset($additionalJS)): ?>
    <?php foreach ($additionalJS as $js): ?>
        <script src="<?php echo $js; ?>"></script>
    <?php endforeach; ?>
<?php endif; ?>

</body>
</html>
