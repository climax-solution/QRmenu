<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorSpecialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_specials', function (Blueprint $table) {
            $table->id();
            $table->string('special_name')->nullable();
            $table->string('price')->nullable();
            $table->string('short_about')->nullable();
            $table->text('more_about')->nullable();
            $table->string('img_url')->nullable();
            $table->string('status')->default(1);
            $table->string('vendor')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendor_specials');
    }
}
