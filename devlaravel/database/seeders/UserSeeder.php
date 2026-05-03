<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        User::create([
            'name' => 'Mehdi mazouz',
            'email' => 'mehdi@gmail.com',
            'role' => 'admin',
            'password' => Hash::make('12345678')
        ]);

        User::factory()->count(5)->create([
            'is_archived' => false,
        ]);

        User::factory()->count(5)->create([
            'is_archived' => true,
            'archived_at' => fake()->dateTimeBetween("-3 months", "-1 month")
        ]);
    }
}
