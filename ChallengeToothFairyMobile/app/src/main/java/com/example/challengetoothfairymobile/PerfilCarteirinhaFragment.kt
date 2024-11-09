package com.example.challengetoothfairymobile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController

class PerfilCarteirinhaFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_perfil_carteirinha, container, false)

        val voltarButton: Button = view.findViewById(R.id.voltar)

        voltarButton.setOnClickListener {
            findNavController().navigate(R.id.action_perfilCarteirinhaFragment_to_perfilClienteFragment)
        }

        return view
    }
}