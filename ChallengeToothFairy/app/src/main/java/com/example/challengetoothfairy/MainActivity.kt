package com.example.challengetoothfairy

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        val editTextEmail = findViewById<EditText>(R.id.editTextEmail)
        val buttonContinuar = findViewById<Button>(R.id.buttonContinuar)
        val textViewEmailVazio = findViewById<TextView>(R.id.textViewEmailVazio)
        val textViewSucesso = findViewById<TextView>(R.id.textViewSucesso)
        val textViewErro = findViewById<TextView>(R.id.textViewErro)

        buttonContinuar.setOnClickListener {
            val email = editTextEmail.text.toString()
            if (email.isEmpty()) {
                textViewEmailVazio.visibility = View.VISIBLE
                textViewErro.visibility = View.GONE
                textViewSucesso.visibility = View.GONE

            } else if (isValidEmail(email)) {
                textViewSucesso.visibility = View.VISIBLE
                textViewErro.visibility = View.GONE
                textViewEmailVazio.visibility = View.GONE

            } else {
                textViewErro.visibility = View.VISIBLE
                textViewSucesso.visibility = View.GONE
                textViewEmailVazio.visibility = View.GONE

            }
        }
    }

    private fun isValidEmail(email: String): Boolean {
        val emailRegex = "^[A-Za-z](.*)([@]{1})(.{1,})(\\.)(.{1,})".toRegex()
        return email.matches(emailRegex)
    }
}