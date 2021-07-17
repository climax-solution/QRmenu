<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->nullable();
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('order_type')->nullable();
            $table->string('overview')->nullable();
            $table->string('vendor')->nullable();
            $table->string('google_map')->nullable();
            $table->string('guest_number')->nullable();
            $table->string('date_time')->nullable();
            $table->string('time')->nullable();
            $table->string('table')->nullable();
            $table->string('table_guest')->nullable();
            $table->text('carts')->nullable();
            $table->enum('status',['-1','0','1','2','3'])->default('1');
            $table->enum('paid_status',['0','1'])->default('0');
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
        Schema::dropIfExists('orders');
    }
}
