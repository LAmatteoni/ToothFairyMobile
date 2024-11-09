package com.example.challengetoothfairymobile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.google.firebase.auth.FirebaseAuth

class CadastroFragment : Fragment() {

    private lateinit var auth: FirebaseAuth
    private lateinit var emailEditText: EditText
    private lateinit var passwordEditText: EditText

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_cadastro, container, false)

        auth = FirebaseAuth.getInstance()

        emailEditText = view.findViewById(R.id.editTextEmail)
        passwordEditText = view.findViewById(R.id.editTextSenha)
        val continuarButton: Button = view.findViewById(R.id.buttonContinuar)

        continuarButton.setOnClickListener {
            registerUser ()
        }

        return view
    }

    private fun registerUser () {
        val email = emailEditText.text.toString()
        val password = passwordEditText.text.toString()

        auth.createUserWithEmailAndPassword(email, password)
        .addOnCompleteListener { task ->
            if (task.isSuccessful) {
                Toast.makeText(requireContext(), "Cadastro realizado com sucesso!", Toast.LENGTH_SHORT).show()
                findNavController().navigate(R.id.action_cadastroFragment_to_perfilClienteFragment)
            } else {
                Toast.makeText(requireContext(), "Falha no cadastro: ${task.exception?.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }
}