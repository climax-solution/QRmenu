<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $feature_name = ['Velkommen Side', 'Meny', 'Pakker','Spesialiteter', 'QR Kode', 'Whatsapp Bestilling','Online Bestilling', 'Reservasion', 'Kontakter', 'Digital Betaling'];
        foreach($feature_name as $name) {
            Feature::create(['feature_name' => $name]);
        }
    }
}
