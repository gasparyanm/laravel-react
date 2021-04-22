<?php

namespace Database\Factories;

use App\Models\EntityMeta;
use Illuminate\Database\Eloquent\Factories\Factory;

class EntityMetaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = EntityMeta::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id'        => $this->faker->uuid,
            'entity_id' => $this->faker->uuid,
            'key'       => $this->faker->unique()->word(),
            'value'     => implode(' ', $this->faker->words()),
            'group_id'  => $this->faker->randomNumber(1)
        ];
    }
}
