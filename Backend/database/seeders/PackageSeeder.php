<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Package::insert([
            'package_name' => 'Basic Package',
            'slug' => '',
            'package_type' => 'free',
            'order_limit' => '10',
            'item_limit' => '10',
            'price' => '30',
        ]);
    }
}
