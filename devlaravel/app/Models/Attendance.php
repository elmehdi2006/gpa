<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date_presence',
        'heure_entree',
        'heure_sortie',
        'statut',
    ];

    protected $casts = [
        'date_presence' => 'date',
        'heure_entree' => 'datetime:H:i',
        'heure_sortie' => 'datetime:H:i',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isPresent(): bool
    {
        return $this->statut === 'present';
    }

    public function isRetard(): bool
    {
        return $this->statut === 'retard';
    }

    public function isAbsent(): bool
    {
        return $this->statut === 'absent';
    }
}