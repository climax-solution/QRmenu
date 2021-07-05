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
            $table->string('currency');
            $table->string('timezone');
            $table->string('site_name');
            $table->string('copyright');
            $table->string('description');
            $table->string('google_analytics');
            $table->boolean('registration');
            $table->boolean('auto_approval');
            $table->boolean('email_verification');
            $table->boolean('free_verify');
            $table->boolean('invoice');
            $table->boolean('rating');
            $table->boolean('recaptcha');
            $table->string('site_key');
            $table->string('secret_key');
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
