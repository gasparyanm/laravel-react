<?php

namespace App\Models;

use App\Models\Concerns\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntityMeta extends Model
{
    use HasFactory, UsesUuid;

    protected $table = 'entity_meta';
}
