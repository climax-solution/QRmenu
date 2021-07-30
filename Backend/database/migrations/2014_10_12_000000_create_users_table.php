<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->nullable();
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->string('legacy')->nullable();
            $table->enum('permission',['admin','vendor'])->default('vendor');
            $table->string('whatsapp')->nullable();
            $table->string('youtube')->nullable();
            $table->string('website')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('instagram')->nullable();
            $table->string('short_about')->nullable();
            $table->string('more_about')->nullable();
            $table->string('package')->nullable();
            $table->text('earning')->default('0,0,0,0,0,0,0,0,0,0,0,0');
            $table->boolean('package_status')->default(1);
            $table->enum('status',[-1,0,1])->default(0);
            $table->string('subdomain')->nullable();
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
        Schema::dropIfExists('users');
    }
}
