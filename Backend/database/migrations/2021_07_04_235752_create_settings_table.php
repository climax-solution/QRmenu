<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('currency')->nullable();
            $table->string('timezone')->nullable();
            $table->string('site_name')->nullable();
            $table->string('copyright')->nullable();
            $table->string('description')->nullable();
            $table->string('google_analytics')->nullable();
            $table->string('recaptcha')->nullable();
            $table->string('normal_setting')->nullable();
            $table->string('site_key')->nullable();
            $table->string('secret_key')->nullable();
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
        Schema::dropIfExists('settings');
    }
}
