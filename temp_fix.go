	// Build connection string
	connString := fmt.Sprintf("postgres://%s:%s@%s:5432/%s?sslmode=%s",
		cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBName, cfg.DBSSLMode)
