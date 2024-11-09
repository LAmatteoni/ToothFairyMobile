package com.example.challengetoothfairymobile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController

class PerfilClienteFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_perfil_cliente, container, false)

        val viewProfileButton: Button = view.findViewById(R.id.button_view_profile)
        val quizButton: Button = view.findViewById(R.id.button_quiz)

        viewProfileButton.setOnClickListener {
            findNavController().navigate(R.id.action_perfilClienteFragment_to_perfilCarteirinhaFragment)
        }

        quizButton.setOnClickListener {
            findNavController().navigate(R.id.action_perfilClienteFragment_to_quizFragment)
        }

        return view
    }
}