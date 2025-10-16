    </main>
    <!-- End Main Content -->

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <!-- Top Section -->
            <div class="footer-top flex jcsb aic">
                <div class="footer-brand">
                    <h3 class="logo">LuxeStay</h3>
                    <p class="footer-tagline">Your Luxury Escape</p>
                </div>
                <div class="social-icons flex">
                    <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>

            <hr class="full-width-hr">

            <!-- Middle Section - Navigation -->
            <div class="footer-nav">
                <ul class="nav-ul flex jcc">
                    <li><a href="/">Home</a></li>
                    <li><a href="/public/rooms.html">Rooms</a></li>
                    <li><a href="/about.html">About</a></li>
                    <li><a href="/contact.html">Contact</a></li>
                    <li><a href="/careers.html">Careers</a></li>
                    <li><a href="/blog.html">Blog</a></li>
                </ul>
            </div>

            <hr class="full-width-hr">

            <!-- Bottom Section - Copyright -->
            <div class="footer-bottom flex jcc">
                <p class="footnote">
                    &copy; <?php echo date('Y'); ?> LuxeStay. All rights reserved. |
                    <a href="/privacy-policy.html">Privacy Policy</a> |
                    <a href="/terms-conditions.html">Terms & Conditions</a> |
                    <a href="/cookies-policy.html">Cookies Policy</a>
                </p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/booking.js"></script>

    <?php if (isset($additionalScripts)): ?>
        <?php foreach ($additionalScripts as $script): ?>
            <script src="<?php echo $script; ?>"></script>
        <?php endforeach; ?>
    <?php endif; ?>

    <?php if (isset($inlineScript)): ?>
        <script>
            <?php echo $inlineScript; ?>
        </script>
    <?php endif; ?>

</body>
</html>
