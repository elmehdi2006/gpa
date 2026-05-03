<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'heure_debut',
        'heure_fin',
        'periode',
    ];

    protected $casts = [
        'heure_debut' => 'datetime:H:i',
        'heure_fin' => 'datetime:H:i',
    ];

    public function isMatin(): bool
    {
        return $this->periode === 'matin';
    }

    public function isApresMidi(): bool
    {
        return $this->periode === 'apres-midi';
    }
}