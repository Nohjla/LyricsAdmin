<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();
Route::get('/', function (){
    return view('auth/login');
});
Route::get('/test', 'SongController@create');
Route::get('/home', 'HomeController@home');
Route::post('/create', 'SongController@store');
Route::post('/update', 'SongController@edit');
Route::get('/songs', 'SongController@show');
Route::get('/getSongs/{id}', 'SongController@get');
Route::delete('/songs/{id}', 'SongController@delete');

