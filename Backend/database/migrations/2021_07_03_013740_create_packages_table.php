<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('package_name')->nullable();
            $table->string('slug')->nullable();
            $table->enum('package_type',['free','monthly','yearly']);
            $table->enum('order_limit',[-1,10,15,20,30,50])->nullable();;
            $table->enum('item_limit',[-1,10,15,20,30,40,50])->nullable();;
            $table->string('package_ability')->nullable();
            $table->string('price')->nullable();
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
        Schema::dropIfExists('packages');
    }
}
