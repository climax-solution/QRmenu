<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderConfigurationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_configurations', function (Blueprint $table) {
            $table->boolean('content_betal')->nullable();
            $table->boolean('bestilling')->nullable();
            $table->boolean('henting')->nullable();
            $table->boolean('betal')->nullable();
            $table->boolean('spis')->nullable();
            $table->string('paypal_email')->nullable();
            $table->boolean('paypal_payment')->nullable();
            $table->boolean('paypal_status')->nullable();
            $table->boolean('paypal_gateway')->nullable();
            $table->boolean('paypal_gateway_status')->nullable();
            $table->string('paypal_gateway_eamil')->nullable();
            $table->boolean('bambora_gateway')->nullable();
            $table->string('bambora_access_key')->nullable();
            $table->string('bambora_merchant_key')->nullable();
            $table->string('bambora_secret_key')->nullable();
            $table->boolean('whatsapp')->nullable();
            $table->boolean('stock_status')->nullable();
            $table->boolean('stock_counter')->nullable();
            $table->boolean('kds')->nullable();
            $table->string('delivery_charge')->nullable();
            $table->boolean('stripe_gateway')->nullable();
            $table->string('strpe_public_key')->nullable();
            $table->string('strpe_secret_key')->nullable();
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
        Schema::dropIfExists('order_configurations');
    }
}
