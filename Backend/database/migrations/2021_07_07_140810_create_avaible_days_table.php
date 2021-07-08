<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAvaibleDaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avaible_days', function (Blueprint $table) {
            $table->id();
            $table->string('sun_mor')->nullable();
            $table->string('sun_aft')->nullable();
            $table->string('mon_mor')->nullable();
            $table->string('mon_aft')->nullable();
            $table->string('tue_mor')->nullable();
            $table->string('tue_aft')->nullable();
            $table->string('wed_mor')->nullable();
            $table->string('wed_aft')->nullable();
            $table->string('thu_mor')->nullable();
            $table->string('thu_aft')->nullable();
            $table->string('fri_mor')->nullable();
            $table->string('fri_aft')->nullable();
            $table->string('sat_mor')->nullable();
            $table->string('sat_aft')->nullable();
            $table->string('type_name')->nullable();
            $table->string('user')->nullable();
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
        Schema::dropIfExists('avaible_days');
    }
}
