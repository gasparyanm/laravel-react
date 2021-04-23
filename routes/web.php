<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

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

// change and check for auth
Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/login', function () {
    return view('welcome');
})->name('login');

Route::get('/register', function () {
    return view('welcome');
})->name('register');

Route::get('/{page}', function () {
    $query = $query ?? '';
    dump($query);
    $query = null;
    dd($query);

    Redis::set('test', 'sad');
    dump(Redis::get('test'));
    Cache::store('redis')->put('Laradock', 'Awesome', 100);
    dd(Cache::get('Laradock'));
})->where('page', '.*');


