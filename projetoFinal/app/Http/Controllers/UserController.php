<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UserRequest;
use App\User;
use App\Notifications\Compra;
use App\Notifications\Venda;

class UserController extends Controller
{
    
    public function createUser(Request $request){
       
        $user = new User;

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();
        
        if (!Storage::exists('localPhotos/')){
            Storage::makeDirectory('localPhotos/',0775,true);
        }
        $file=$request->file('photo');
        $filename = $user->id. "." .$file->getClientOriginalExtension();
        $path = $file->storeAs('localPhotos', $filename);
        $user->photo = $path;
        $user->save();

        
        
        return response()->json([$user]);
    }
      
    public function listUser(){
        $user = User::all();
        return response()->json($user);
    }
      
    public function showUser($id){
        $user = User::findOrFail($id);
        return response()->json([$user]);
    }
      
    public function updateUser(Request $request, $id){
        $user = User::find($id);
        
        if($user){
            if($request->name){
                $user->name = $request->name;
            }
            if($request->email){
                $user->email = $request->email;
            }
            if($request->password){
                $user->password = $request->password;
            }
            $user->save();
            return response()->json([$user]);
        }
        else{
            return response()->json(['Este usuário não existe']);
        }
    }
    
    public function deleteUser($id){
        $user = User::findOrFail($id);
        Storage::delete($user->photo);
        User::destroy($id);
        return response()->json(['Usuário Deletado']);
    }

    public function showPhoto($id){        //Essa função mostra a foto para o usuário pelo front
        $user = User::findOrFail($id);      //permitindo que o mesmo faça download de sua foto.     
        return Storage::download($user->photo);  

    }

}
