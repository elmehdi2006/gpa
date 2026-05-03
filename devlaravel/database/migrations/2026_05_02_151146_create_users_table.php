<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name') ;
            $table->string('email') ;
            $table->enum('role' , ['admin' , 'employe']) ;
            $table->string('poste')->nullable() ;
            $table->string('password') ;
            $table->boolean('is_archived')->default(false) ;
            $table->timestamp('archived_at')->nullable() ;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
