<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntityMetaTable extends Migration
{
    /**
     * Run the migrations.dashboard
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entity_meta', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('entity_id');
            $table->string('key', 40);
            $table->text('value');
            $table->unsignedSmallInteger('group_id');
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
        Schema::dropIfExists('entity_meta');
    }
}
