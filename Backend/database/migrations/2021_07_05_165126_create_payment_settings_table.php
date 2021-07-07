<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('paypal_payment')->nullable();
            $table->boolean('paypal_status')->nullable();
            $table->string('paypal_email')->nullable();
            $table->boolean('stripe_gateway')->nullable();
            $table->string('stripe_public_key')->nullable();
            $table->string('stripe_secret_key')->nullable();
            $table->boolean('razor_payment')->nullable();
            $table->string('razor_key')->nullable();
            $table->boolean('bambora_gateway')->nullable();
            $table->string("bambora_access_key")->nullable();
            $table->string("bambora_merchant")->nullable();
            $table->string("bambora_secret_key")->nullable();
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
        Schema::dropIfExists('payment_settings');
    }
}
