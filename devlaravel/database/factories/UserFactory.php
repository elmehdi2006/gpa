<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $posts = ['RH', 'Developer', 'Designer'];

        return [
            //
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'role' => 'employe',
            'poste' => fake()->randomElement($posts),
            'password' => Hash::make('12345678'),
        ];
    }
}
