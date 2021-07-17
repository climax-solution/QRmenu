<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->nullable();
            $table->string('order_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('order_type')->nullable();
            $table->string('comments')->nullable();
            $table->string('overview')->nullable();
            $table->string('status')->nullable();
            $table->string('vendor')->nullable();
            $table->string('guest_number')->nullable();
            $table->string('table_reservation')->nullable();
            $table->string('reservation_date')->nullable();
            $table->date('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
