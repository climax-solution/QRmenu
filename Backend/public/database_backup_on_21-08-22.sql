

CREATE TABLE `allergens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `avaible_days` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sun_mor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sun_aft` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mon_mor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mon_aft` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tue_mor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tue_aft` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wed_mor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wed_aft` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thu_mor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thu_aft` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fri_mor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fri_aft` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sat_mor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sat_aft` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `domains` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenant_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `domains_domain_unique` (`domain`) USING HASH,
  KEY `domains_tenant_id_foreign` (`tenant_id`(250))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `earnings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `vendor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`) USING HASH
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `features` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `feature_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('1','Velkommen Side','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('2','Meny','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('3','Pakker','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('4','Spesialiteter','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('5','QR Kode','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('6','Whatsapp Bestilling','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('7','Online Bestilling','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('8','Reservasion','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('9','Kontakter','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');

INSERT INTO features (id, feature_name, status, heading, sub_heading, created_at, updated_at) VALUES ('10','Digital Betaling','','','','2021-08-19 07:30:44','2021-08-19 07:30:44');


CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=469 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO migrations (id, migration, batch) VALUES ('442','2014_10_12_000000_create_users_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('443','2014_10_12_100000_create_password_resets_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('444','2016_06_01_000001_create_oauth_auth_codes_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('445','2016_06_01_000002_create_oauth_access_tokens_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('446','2016_06_01_000003_create_oauth_refresh_tokens_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('447','2016_06_01_000004_create_oauth_clients_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('448','2016_06_01_000005_create_oauth_personal_access_clients_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('449','2019_08_19_000000_create_failed_jobs_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('450','2019_09_15_000020_create_domains_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('451','2021_07_03_013740_create_packages_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('452','2021_07_04_144126_create_restaurants_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('453','2021_07_04_235752_create_settings_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('454','2021_07_05_165126_create_payment_settings_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('455','2021_07_05_165246_create_offline_payments_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('456','2021_07_05_165338_create_transaction_histories_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('282','2021_07_07_060043_create_profiles_table','1');

INSERT INTO migrations (id, migration, batch) VALUES ('457','2021_07_07_012658_create_order_configurations_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('458','2021_07_07_025400_create_payment_histories_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('459','2021_07_07_050101_create_features_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('460','2021_07_07_063005_create_reservations_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('461','2021_07_07_140810_create_avaible_days_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('462','2021_07_08_001019_create_vendor_categories_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('414','2020_02_22_074913_create_permission_tables','8');

INSERT INTO migrations (id, migration, batch) VALUES ('463','2021_07_08_121126_create_vendor_items_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('464','2021_07_08_144651_create_vendor_specials_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('465','2021_07_09_045214_create_orders_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('466','2021_07_26_094524_create_allergens_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('467','2021_07_26_140414_create_vendor_packages_table','9');

INSERT INTO migrations (id, migration, batch) VALUES ('468','2021_07_26_160532_create_earnings_table','9');


CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) VALUES ('a3de0c7a265663ae37c7149ba38f7d75b0d37b941a24e015ec09edcb360c98a73672721f8c5ca05a','1','1','admin@admin.com','[]','0','2021-08-20 07:25:34','2021-08-20 07:25:34','2021-08-20 17:25:34');

INSERT INTO oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) VALUES ('60ee0a4ef7afa2b55e937ebea0d92f4fa272e7f8b5a3113d5beba9433d470d2ecc34b1e5555ed2e8','1','1','admin@admin.com','[]','0','2021-08-20 07:27:49','2021-08-20 07:27:49','2021-08-20 17:27:48');

INSERT INTO oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) VALUES ('b910ccef4cbd065996f66523c6217e610f22d0c66e67a2c3491753be0fb8b43d935fdb46d54ffac9','2','1','eat@rest.com','[]','0','2021-08-20 08:41:40','2021-08-20 08:41:40','2021-08-20 18:41:39');

INSERT INTO oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) VALUES ('5c7a53c55ac1911d9d0a10171d70c33ca6ec31fa7b65af2095f2be6070586d5b2c02a3b306b7ef92','1','1','admin@admin.com','[]','0','2021-08-21 19:13:35','2021-08-21 19:13:35','2021-08-22 05:13:28');

INSERT INTO oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) VALUES ('0e79a18e594d14f8e608b1ec70e892fff07864b1d3065ebfa6b14dad2fa73d577d10197d2b97b15b','2','1','eat@rest.com','[]','0','2021-08-21 19:14:44','2021-08-21 19:14:44','2021-08-22 05:14:44');

INSERT INTO oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) VALUES ('b196a863a9ae4c0b16849c190228f3eef0edde61683236716081e365a1dc76047d7a1734997e007f','1','1','admin@admin.com','[]','0','2021-08-22 14:20:53','2021-08-22 14:20:53','2021-08-23 00:20:47');


CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `oauth_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO oauth_clients (id, user_id, name, secret, provider, redirect, personal_access_client, password_client, revoked, created_at, updated_at) VALUES ('1','','Laravel Personal Access Client','SRa7udzV1i7b6txauT50TgeM1CnDDGIKYQt9UKjw','','http://localhost','1','0','0','2021-08-20 07:25:16','2021-08-20 07:25:16');

INSERT INTO oauth_clients (id, user_id, name, secret, provider, redirect, personal_access_client, password_client, revoked, created_at, updated_at) VALUES ('2','','Laravel Password Grant Client','Qql6jhe6af8rVkq4sVoFt984TOMhz404EBCt0w4s','users','http://localhost','0','1','0','2021-08-20 07:25:16','2021-08-20 07:25:16');


CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO oauth_personal_access_clients (id, client_id, created_at, updated_at) VALUES ('1','1','2021-08-20 07:25:16','2021-08-20 07:25:16');


CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `offline_payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `package` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `order_configurations` (
  `content_betal` tinyint(1) DEFAULT NULL,
  `bestilling` tinyint(1) DEFAULT NULL,
  `henting` tinyint(1) DEFAULT NULL,
  `betal` tinyint(1) DEFAULT NULL,
  `spis` tinyint(1) DEFAULT NULL,
  `paypal_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypal_payment` tinyint(1) DEFAULT NULL,
  `paypal_status` tinyint(1) DEFAULT NULL,
  `paypal_gateway` tinyint(1) DEFAULT NULL,
  `paypal_gateway_status` tinyint(1) DEFAULT NULL,
  `paypal_gateway_eamil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bambora_gateway` tinyint(1) DEFAULT NULL,
  `bambora_access_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bambora_merchant_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bambora_secret_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` tinyint(1) DEFAULT NULL,
  `stock_status` tinyint(1) DEFAULT NULL,
  `stock_counter` tinyint(1) DEFAULT NULL,
  `kds` tinyint(1) DEFAULT NULL,
  `delivery_charge` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_gateway` tinyint(1) DEFAULT NULL,
  `strpe_public_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `strpe_secret_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `overview` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_map` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guest_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `table` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `table_guest` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `carts` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('-1','0','1','2','3') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `paid_status` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `view_status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO orders (id, name, phone, email, address, order_type, overview, vendor, google_map, guest_number, date_time, time, table, table_guest, total, carts, status, paid_status, view_status, created_at, updated_at) VALUES ('1','56','','','','','','eat@rest.com','','','','','','','','','0','0','1','2021-08-21 05:50:48','2021-08-21 20:52:36');


CREATE TABLE `packages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `package_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `package_type` enum('free','monthly','yearly') COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_limit` enum('-1','10','15','20','30','50') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_limit` enum('-1','10','15','20','30','40','50') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `package_ability` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO packages (id, package_name, slug, package_type, order_limit, item_limit, package_ability, price, created_at, updated_at) VALUES ('1','New Package','qwertyu','monthly','20','','a:10:{i:0;b:1;i:1;b:1;i:2;b:1;i:3;b:1;i:4;b:1;i:5;b:1;i:6;b:1;i:7;b:1;i:8;b:1;i:9;b:1;}','63','','');

INSERT INTO packages (id, package_name, slug, package_type, order_limit, item_limit, package_ability, price, created_at, updated_at) VALUES ('2','Second Package','qwertyu','monthly','10','','a:10:{i:0;b:1;i:1;b:1;i:2;b:1;i:3;b:1;i:4;b:1;i:5;b:1;i:6;b:1;i:7;b:1;i:8;b:1;i:9;b:1;}','33','','');


CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`(250))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `payment_histories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `payment_settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `paypal_payment` tinyint(1) DEFAULT NULL,
  `paypal_status` tinyint(1) DEFAULT NULL,
  `paypal_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_gateway` tinyint(1) DEFAULT NULL,
  `stripe_public_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_secret_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razor_payment` tinyint(1) DEFAULT NULL,
  `razor_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bambora_gateway` tinyint(1) DEFAULT NULL,
  `bambora_access_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bambora_merchant` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bambora_secret_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO permissions (id, name, guard_name, created_at, updated_at) VALUES ('1','qrcode_manage','web','2021-08-06 01:54:54','2021-08-06 01:54:54');

INSERT INTO permissions (id, name, guard_name, created_at, updated_at) VALUES ('2','user_manage','web','2021-08-06 01:54:54','2021-08-06 01:54:54');


CREATE TABLE `profiles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `reservations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comments` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `overview` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `vendor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guest_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `table_reservation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reservation_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `restaurants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `packages` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO roles (id, name, guard_name, created_at, updated_at) VALUES ('1','Admin','web','2021-08-06 01:54:54','2021-08-06 01:54:54');

INSERT INTO roles (id, name, guard_name, created_at, updated_at) VALUES ('2','User','web','2021-08-06 01:54:54','2021-08-06 01:54:54');


CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `copyright` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_analytics` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recaptcha` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `normal_setting` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secret_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `transaction_histories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `package` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `legacy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permission` enum('admin','vendor') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'vendor',
  `whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_about` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `more_about` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `package` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `earning` text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0,0,0,0,0,0,0,0,0,0,0,0',
  `package_status` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('-1','0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `subdomain` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`) USING HASH
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO users (id, username, email, password, legacy, permission, whatsapp, youtube, website, facebook, twitter, instagram, short_about, more_about, package, earning, package_status, status, subdomain, created_at, updated_at) VALUES ('1','','admin@admin.com','$2y$10$.lJbzK1jJV3i17Al.UmrOeUKuSrf.jeS6F3OtudlbsUlazNlxRJyC','','admin','','','','','','','','','','0,0,0,0,0,0,0,0,0,0,0,0','1','1','','','');

INSERT INTO users (id, username, email, password, legacy, permission, whatsapp, youtube, website, facebook, twitter, instagram, short_about, more_about, package, earning, package_status, status, subdomain, created_at, updated_at) VALUES ('2','restaurant','eat@rest.com','$2y$10$VPFSXHjiWYBqTDpOGsYszepeE3gIps7Dm37wSwq9f6DVrWrhxfN.C','','vendor','12','21','21','21','2','2','','','1','0,0,0,0,0,0,0,0,0,0,0,0','1','1','1221212211211','2021-08-19 07:36:33','2021-08-20 15:28:35');


CREATE TABLE `vendor_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `vendor_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_des` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `more_des` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `allergen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `vendor_packages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `package_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `vendor_specials` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `special_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_about` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `more_about` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `vendor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

