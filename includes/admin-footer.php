        </div>
        <!-- End Admin Content -->
    </main>
    <!-- End Admin Main -->
</div>
<!-- End Admin Layout -->

<!-- JavaScript -->
<script src="/assets/js/main.js"></script>
<script src="/assets/js/admin.js"></script>

<!-- Additional JavaScript if needed -->
<?php if (isset($additionalJS)): ?>
    <?php foreach ($additionalJS as $js): ?>
        <script src="<?php echo $js; ?>"></script>
    <?php endforeach; ?>
<?php endif; ?>

</body>
</html>
