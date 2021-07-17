<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvaibleDay extends Model
{
    use HasFactory;
    protected $fillable = [
        'sun_mor',
        'sun_aft',
        'mon_mor',
        'mon_aft',
        'tue_mor',
        'tue_aft',
        'wed_mor',
        'wed_aft',
        'thu_mor',
        'thu_aft',
        'fri_mor',
        'fri_aft',
        'sat_mor',
        'sat_aft',
        'user'
    ];
}
