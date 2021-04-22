<?php

namespace Database\Seeders;

use App\Models\EntityMeta;
use Illuminate\Database\Seeder;

class EntityMetaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // will be connected with entity
        $entityMetas = EntityMeta::factory()
            ->count(10)
            ->create();

        dd($entityMetas);
    }
}
