<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SongsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('songs')->insert([
            'title' => Str::random(10),
            'artist' => Str::random(10),
            'lyrics' => Str::random(10),
        ]);
    }
}
